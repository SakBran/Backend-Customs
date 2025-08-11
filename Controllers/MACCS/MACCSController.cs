using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using BackendCustoms.Controllers.IRD.Request;
using BackendCustoms.Controllers.IRD.Response;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers.IRD
{
    [ApiController]
    [Route("api/[controller]")]
    public class MACCSController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MACCSController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("/api/verificationConfirmation")]
        public async Task<IActionResult> verificationConfirmation(verificationConfirmationRequest request)
        {
            try
            {
                //Delete လုပ်ပြီးသားပြန်ပို့တာကိုစစ်တာ
                var isExistInDelete = await _context.ceiridFromIRD_DeletedLogs.AnyAsync(x => x.CEIRID == request.ceirId);
                if (isExistInDelete)
                {
                    return BadRequest("Cannot send data. CEIRID already deleted.");
                }
                //ရှီပြီသားပို့တာကိုစစ်တာ
                var isExist = await _context.ceiridFromIRDs.AnyAsync(x => x.CEIRID == request.ceirId);
                if (isExist)
                {
                    return BadRequest("Cannot send data. CEIRID already exists.");
                }

                var data = new CeiridFromIRD
                {
                    CEIRID = request.ceirId,
                    ReceivedDatetime = DateTime.Now,
                    IsSent = false,
                    SendDatetime = null
                };
                await _context.ceiridFromIRDs.AddAsync(data);
                var _customQuery = _context.CustomsDatas.Where(x => x.MaccsCEIRID == request.ceirId);
                if (await _customQuery.AnyAsync())
                {
                    var temp = await _customQuery.FirstOrDefaultAsync();
                    if (temp != null)
                    {
                        temp.CEIRID = request.ceirId;
                        //17.06.2025 Manual sent action
                        temp.EditBy = "System Schedule";
                        temp.Remark = "IRD မှ Data ပို့လိုက်ပါသဖြင့် အချက်အလက်များကို စနစ်မှအလိုအလျှောက် ပြင်ဆင်လိုက်ပါသည်။";
                        temp.EditDatetime = DateTime.Now;
                        temp.EditCeirid = temp.CEIRID;
                    }
                }

                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/api/sussessfulPayments")]
        public async Task<IActionResult> sussessfulPayments(sussessfulPaymentsRequest request)
        {
            try
            {
                var Response = new List<successfulPaymentsResponse>();
                var data = await _context.CustomsDatas.Where(x => x.SentDatetime >= request.beginDate && x.SentDatetime <= request.endDate.AddHours(23).AddMinutes(59).AddSeconds(59) && x.Status == AppConfig.Sent)
                                                      .ToListAsync();
                // var data = await _context.CustomsDatas.Where(x => x.RODate >= request.beginDate && x.RODate <= request.endDate.AddHours(23).AddMinutes(59).AddSeconds(59) && x.Status == AppConfig.Sent)
                //                                       .ToListAsync();
                if (data.Count == 0)
                {
                    return Ok(new List<successfulPaymentsResponse>()); // Return empty response if no data found
                }
                var groupedData = data.GroupBy(x => new { x.CEIRID, x.RONo })
                                      .Select(g => new
                                      {
                                          CEIRID = g.Key.CEIRID,
                                          RONo = g.Key.RONo,
                                          SumCt = g.Sum(x => x.CT),
                                          SumCd = g.Sum(x => x.CD),
                                          SumAit = g.Sum(x => x.AT),
                                          SumRf = g.Sum(x => x.RF)
                                      });
                foreach (var item in groupedData)
                {
                    var responseItem = new successfulPaymentsResponse
                    {
                        NotificationDateTime = DateTime.Now,
                        CeirId = item.CEIRID ?? string.Empty,
                        ReleaseOrderNumber = item.RONo ?? string.Empty,
                        SumCt = item.SumCt ?? 0,
                        SumCd = item.SumCd ?? 0,
                        SumAit = item.SumAit ?? 0,
                        SumRf = item.SumRf ?? 0
                    };
                    Response.Add(responseItem);
                }

                return Ok(Response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/api/deleteApplication")]
        public async Task<IActionResult> deleteApplication(deleteApplicationRequest request)
        {
            try
            {
                var data = await _context.ceiridFromIRDs.FirstOrDefaultAsync(x => x.CEIRID == request.ceirId);

                if (data == null)
                {
                    return NotFound("Data not found");
                }
                // Check if the data has already been sent
                if (data.IsSent == true)
                {
                    return BadRequest("Cannot delete sent data. RO already sent to IRD.");
                }

                var deletedLog = new CeiridFromIRD_DeletedLog
                {
                    CEIRID = data.CEIRID,
                    ReceivedDatetime = data.ReceivedDatetime,
                    IsSent = data.IsSent,
                    SendDatetime = data.SendDatetime,
                    DeletedDateTime = DateTime.Now
                };
                _context.ceiridFromIRD_DeletedLogs.Add(deletedLog);
                _context.ceiridFromIRDs.Remove(data);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}