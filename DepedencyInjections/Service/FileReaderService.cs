using System;
using System.Collections.Generic;
using System.Globalization;
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
            var basePath = Path.Combine(setting.sourceFolder, "Received");

            if (!Directory.Exists(basePath))
                return new List<string>();

            // Get all subdirectories (like 20250612, 20250613, etc.)
            var dateFolders = Directory.GetDirectories(basePath, "*", SearchOption.TopDirectoryOnly);

            var files = new List<string>();

            foreach (var folder in dateFolders)
            {
                var matchingFiles = Directory.GetFiles(folder, setting.toReadFileName + "*", SearchOption.TopDirectoryOnly)
                    .Where(file => file.EndsWith(".edi", StringComparison.OrdinalIgnoreCase))
                    .ToList();

                files.AddRange(matchingFiles);
            }

            return files;
        }


        private CustomsData? ParseFileToCustomsData(string filePath, SystemSetting setting)
        {
            var lines = File.ReadAllLines(filePath);
            var CEIR = GetValueBetweenLine(lines, 59, 82, 1, "CEIR");
            if (CEIR == "")
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                return null;
            }
            else
            {
                var MaccsCEIRID = GetValueBetweenLine(lines, 59, 82, 1, "CEIR");
                var RONo = GetLineValue(lines, "9");
                var RODate = GetLineValueAsDate(lines, "210");
                var CD = Convert.ToDecimal(GetValueBetweenLine(lines, 112, 151, 2, "CD") == "" ? "0" : GetValueBetweenLine(lines, 112, 151, 2, "CD"));
                var CT = Convert.ToDecimal(GetValueBetweenLine(lines, 112, 151, 2, "CT") == "" ? "0" : GetValueBetweenLine(lines, 112, 151, 2, "CT"));
                var AT = Convert.ToDecimal(GetValueBetweenLine(lines, 112, 151, 2, "AT") == "" ? "0" : GetValueBetweenLine(lines, 112, 151, 2, "AT"));
                var RF = Convert.ToDecimal(GetValueBetweenLine(lines, 112, 151, 2, "RF") == "" ? "0" : GetValueBetweenLine(lines, 112, 151, 2, "RF"));
                var ReceivedDatetime = DateTime.Now;
                return new CustomsData
                {
                    MaccsCEIRID = MaccsCEIRID,
                    RONo = RONo,
                    RODate = RODate,
                    CD = CD,
                    CT = CT,
                    AT = AT,
                    RF = RF,
                    ReceivedDatetime = ReceivedDatetime,
                };
            }

        }

        private string GetValueBetweenLine(string[] lines, int startLine, int endLine, int plusLine, string key)
        {
            string CEIR = "";


            for (int i = startLine - 1; i < endLine && i < lines.Length; i++) // Adjust for zero-based index
            {
                if (lines[i].Contains(key)) // Check if "CEIR" exists in the line
                {
                    int valueLine = i + plusLine; // Get the next line number
                    if (valueLine < lines.Length) // Ensure it's within bounds
                    {
                        CEIR = lines[valueLine].Trim(); // Extract and clean the value
                    }
                    break; // Stop after the first occurrence
                }
            }
            return CEIR;
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
            if (DateTime.TryParseExact(value, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date))
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