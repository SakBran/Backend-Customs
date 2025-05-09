using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Service.CeirService.Request
{
    public class GetTokenRequest
    {
        public required string authUrl { get; set; }
        public required string principal { get; set; }
        public required string credentials { get; set; }
    }
}