using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Service.CeirService.Request
{
    public class PaymentConfirmationRequest
    {

        [JsonPropertyName("ceirId")]
        public string? CeirId { get; set; }


        [JsonPropertyName("releaseOrderNumber")]
        public string? ReleaseOrderNumber { get; set; }


        [JsonPropertyName("dateTime")]
        public DateTime DateTime { get; set; }


        [JsonPropertyName("SUM_CT")]
        public double SumCT { get; set; } // Commercial Tax


        [JsonPropertyName("SUM_CD")]
        public double SumCD { get; set; } // Customs Duty


        [JsonPropertyName("SUM_AIT")]
        public double SumAIT { get; set; } // Advanced Income Tax


        [JsonPropertyName("SUM_RF")]
        public double SumRF { get; set; } // Penalties
    }
}