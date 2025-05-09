using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class FileReaderService : IFileReaderService
    {
        public List<CustomsData> ReadAndMoveFiles(SystemSetting setting)
        {
            var result = new List<CustomsData>();

            EnsureDirectoryExists(setting.completeFolder);

            var files = GetEligibleFiles(setting);

            foreach (var filePath in files)
            {
                var customsData = ParseFileToCustomsData(filePath, setting);
                if (customsData != null)
                {
                    result.Add(customsData);
                    MoveFileToCompleteFolder(filePath, setting.completeFolder);
                }
            }

            return result;
        }

        private void EnsureDirectoryExists(string folderPath)
        {
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
        }

        private List<string> GetEligibleFiles(SystemSetting setting)
        {
            return Directory.GetFiles(setting.sourceFolder, setting.toReadFileName, SearchOption.TopDirectoryOnly)
            .Where(file => file.EndsWith(".edi", StringComparison.OrdinalIgnoreCase) &&
                       file.StartsWith(setting.toReadFileNameStartWith, StringComparison.OrdinalIgnoreCase))
            .ToList();
        }

        private CustomsData ParseFileToCustomsData(string filePath, SystemSetting setting)
        {
            var lines = File.ReadAllLines(filePath);

            return new CustomsData
            {
                MACCSCEIRID = GetLineValue(lines, setting.CEIRID),
                RONo = GetLineValue(lines, setting.RONo),
                RODate = GetLineValueAsDate(lines, setting.RODate),
                CD = GetLineValueDecimal(lines, setting.CD),
                CT = GetLineValueDecimal(lines, setting.CT),
                AT = GetLineValueDecimal(lines, setting.AT),
                RF = GetLineValueDecimal(lines, setting.RF),
                ReceivedDatetime = DateTime.Now,
            };
        }
        private string GetLineValue(string[] lines, string indexSetting)
        {
            if (int.TryParse(indexSetting, out int index) && index > 0 && index <= lines.Length)
            {
                return lines[index - 1];
            }
            return string.Empty;
        }
        private decimal GetLineValueDecimal(string[] lines, string indexSetting)
        {
            if (int.TryParse(indexSetting, out int index) && index > 0 && index <= lines.Length)
            {
                return Convert.ToDecimal(lines[index - 1]);
            }
            return new decimal(0);
        }

        private DateTime? GetLineValueAsDate(string[] lines, string indexSetting)
        {
            var value = GetLineValue(lines, indexSetting);
            if (DateTime.TryParse(value, out DateTime date))
            {
                return date;
            }
            return null;
        }

        private void MoveFileToCompleteFolder(string filePath, string completeFolder)
        {
            var destinationPath = Path.Combine(completeFolder, Path.GetFileName(filePath));
            File.Move(filePath, destinationPath, overwrite: true);
        }
    }
}