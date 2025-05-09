using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.Model;

namespace BackendCustoms.DepedencyInjections.Interface
{
    public interface ICustomDataFilterAndSaveService
    {
        Task<List<CustomsData>> GetIrdToSendList(List<CustomsData> request);
        Task SaveAccordingToStatus(CustomsData request, string status);
    }
}