﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unicorn.Core.DTOs;

namespace Unicorn.Core.Interfaces
{
    public interface ICompanyService
    {
        Task Create(CompanyDTO companyDto);
    }
}
