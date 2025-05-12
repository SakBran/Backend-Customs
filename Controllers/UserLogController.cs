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
    public class UserLogController : BaseAPIController<UserLog>
    {
        private readonly ApplicationDbContext _context;
        public UserLogController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}