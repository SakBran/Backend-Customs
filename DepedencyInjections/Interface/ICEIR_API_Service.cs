using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.DepedencyInjections.Service.CeirService.Request;

namespace BackendCustoms.DepedencyInjections.Interface
{
    public interface ICEIR_API_Service
    {
        Task<string> GetTokenAsync(GetTokenRequest request);
        Task<string> PaymentConfirmation(ConfirmationRequest request);
    }
}