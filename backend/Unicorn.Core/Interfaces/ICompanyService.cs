﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Unicorn.Core.DTOs;

namespace Unicorn.Core.Interfaces
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyDTO>> GetAllAsync();
        Task<CompanyDTO> GetByIdAsync(long id);
    }
}