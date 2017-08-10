﻿using System;
using System.Collections.Generic;
using Unicorn.DataAccess.Interfaces;

namespace Unicorn.DataAccess.Entities
{
    public class Account : IEntity
    {
        public long Id { get; set; }
        public bool IsDeleted { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public SocialAccount SocialAccount { get; set; }

        public DateTime DateCreated { get; set; }

        public string Avatar { get; set; }

        public int Rating { get; set; }

        
        public virtual Role Role { get; set; }

        public virtual ICollection<Permission> Permissions { get; set; }
    }
}