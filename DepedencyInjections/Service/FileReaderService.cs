using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.Model;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class FileReaderService
    {
        public List<CustomsData> ReadAndMoveFiles(SystemSetting setting)
        {
            var result = new List<CustomsData>();

            if (!Directory.Exists(setting.completeFolder))
            {
                Directory.CreateDirectory(setting.completeFolder);
            }

            var files = Directory.GetFiles(setting.sourceFolder, setting.toReadFileName, SearchOption.TopDirectoryOnly)
                .Where(file => file.EndsWith(".edi", StringComparison.OrdinalIgnoreCase) && file.StartsWith(setting.toReadFileNameStartWith, StringComparison.OrdinalIgnoreCase))
                .ToList();

            foreach (var filePath in files)
            {
                var lines = File.ReadAllLines(filePath);

                string line1 = lines.Length >= 1 ? lines[0] : string.Empty;
                string line2 = lines.Length >= 2 ? lines[1] : string.Empty;
                string line4 = lines.Length >= 4 ? lines[3] : string.Empty;

                //result.Add((Path.GetFileName(filePath), line1, line2, line4));

                // Move file to 'complete' folder
                var destinationPath = Path.Combine(setting.completeFolder, Path.GetFileName(filePath));
                File.Move(filePath, destinationPath, overwrite: true);
            }

            return result;
        }
    }
}