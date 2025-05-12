using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Model
{
    public class UserLog
    {
        public UserLog()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        [Key]
        public string Id { get; set; }
        public string? Description { get; set; }
        public DateTime? LogDatetime { get; set; }
        public string? UserId { get; set; }
        public string? FullName { get; set; }
        public string? OldData { get; set; }
        public string? NewData { get; set; }
        public string? Ipv4Address { get; set; }
        public string? Longitude { get; set; }
        public string? Latidute { get; set; }
    }
}