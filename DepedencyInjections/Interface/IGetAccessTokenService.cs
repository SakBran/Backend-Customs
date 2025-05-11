using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Interface
{
    public interface IGetaccessTokenService
    {
        string GetaccessTokenAsync();
    }
}