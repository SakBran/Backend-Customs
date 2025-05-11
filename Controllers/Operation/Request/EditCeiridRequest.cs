using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.CustomsData.Request
{
    public class EditCeiridRequest
    {
        public string? ceirId { get; set; }
        public string? remark { get; set; }
        public string? id { get; set; }
    }
}