﻿using System;
using System.Collections.Generic;

namespace Unicorn.Shared.DTOs
{
    public class CompanyDTO
    {
        public long Id { get; set; }

        public DateTime FoundationDate { get; set; }

        public int Staff { get; set; }


        public virtual AccountDTO Account { get; set; }

        public virtual LocationDTO Location { get; set; }

        public virtual IEnumerable<VendorDTO> Vendors { get; set; }
    }
}
