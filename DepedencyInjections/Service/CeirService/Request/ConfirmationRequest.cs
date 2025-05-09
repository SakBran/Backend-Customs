using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Service.CeirService.Request
{
    public class ConfirmationRequest
    {
        public required PaymentConfirmationRequest body { get; set; }
        public required string ApiURl { get; set; }
        public required string Token { get; set; }
    }
}