using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.DBContext;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Mvc;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SystemSettingController : BaseAPIController<SystemSetting>
    {
        private readonly ApplicationDbContext _context;
        public SystemSettingController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

    }
}