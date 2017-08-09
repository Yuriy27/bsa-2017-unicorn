﻿using System.Collections.Generic;

namespace Unicorn.DataAccess.Entities
{
    public class Role
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
