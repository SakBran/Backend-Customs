using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.DBContext;
using Azure.Core;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class CustomDataFilterAndSaveService : ICustomDataFilterAndSaveService
    {
        private readonly ApplicationDbContext _context;
        public CustomDataFilterAndSaveService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CustomsData>> GetIrdToSendList(List<CustomsData> request)
        {
            var toSendList = new List<CustomsData>();

            foreach (var data in request)
            {
                var isCEIR_Exist = await _context.ceiridFromIRDs.AnyAsync(x => x.CEIRID == data.MaccsCEIRID);
                if (isCEIR_Exist)
                {
                    var isExist = await _context.CustomsDatas.AnyAsync(x => x.MaccsCEIRID == data.MaccsCEIRID);

                    if (!isExist)
                    {
                        data.CEIRID = data.MaccsCEIRID;
                        await _context.CustomsDatas.AddAsync(data);
                        toSendList.Add(data); // Only add to toSendList if it's not a duplicate
                    }
                    else
                    {
                        data.CEIRID = data.MaccsCEIRID;
                        data.Status = AppConfig.Duplicate;
                        data.SentDatetime=DateTime.Now;
                        // Optionally log or handle duplicates
                    }
                }
                else
                {
                    data.Status = AppConfig.NotSent;
                    data.SentDatetime=DateTime.Now;
                }
            }
            await _context.SaveChangesAsync();
            return toSendList;
        }
        public async Task SaveAccordingToStatus(CustomsData request, string status)
        {
            var data = await _context.CustomsDatas.Where(x => x.id == request.id).FirstOrDefaultAsync();
            
            if (status == HttpStatusCode.OK.ToString())
            {
                if (data != null)
                {
                    data.Status = AppConfig.Sent;
                    data.SentDatetime=DateTime.Now;
                    var ceirid=await _context.ceiridFromIRDs.Where(x=>x.CEIRID==data.MaccsCEIRID).FirstOrDefaultAsync();
                    if(ceirid!=null){
                        ceirid.IsSent=true;
                        ceirid.SendDatetime=data.SentDatetime;
                    }
                }
            }
            else
            {
                if (data != null)
                {
                    data.Status = AppConfig.Failed;
                    data.SentDatetime=DateTime.Now;
                }
            }
            await _context.SaveChangesAsync();
        }
    }
}