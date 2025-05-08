using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.Model;

namespace BackendCustoms.DepedencyInjections.Interface
{
    public interface IFileReaderService
    {
        List<CustomsData> ReadAndMoveFiles(SystemSetting setting);
    }
}