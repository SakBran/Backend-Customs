using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.Model;

namespace BackendCustoms.Controllers.Dashboard.Response
{
    public class GetDailyResponse
    {
        public int Sent { get; set; } = 0;
        public int NotSent { get; set; } = 0;
        public int Failed { get; set; } = 0;
        public int Ceirid { get; set; } = 0;
        public List<Model.CustomsData> SentList { get; set; } = new List<Model.CustomsData>();
        public List<CeiridFromIRD> CeiridList { get; set; } = new List<CeiridFromIRD>();

    }
}