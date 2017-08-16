﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

using Unicorn.Core.Interfaces;
using Unicorn.DataAccess.Entities;
using Unicorn.DataAccess.Interfaces;
using Unicorn.Shared.DTOs;
using Unicorn.Shared.DTOs.Subcategory;
using Unicorn.Shared.DTOs.Register;

namespace Unicorn.Core.Services
{
    public class VendorService : IVendorService
    {
        private readonly IUnitOfWork _unitOfWork;

        public VendorService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<VendorDTO>> GetAllAsync()
        {
            var vendors = await _unitOfWork.VendorRepository.Query
                .Include(v => v.Person)
                .Include(v => v.Person.Location)
                .Include(v => v.PortfolioItems)
                .Include(v => v.Works)
                .Include(v => v.Contacts)
                .Include(v => v.Company)
                .ToListAsync();

            return vendors.Select(v => VendorToDTO(v));
        }

        public async Task<VendorDTO> GetByIdAsync(long id)
        {
            var vendor = await _unitOfWork.VendorRepository.Query
                .Include(v => v.Person)
                .Include(v => v.Person.Location)
                .Include(v => v.PortfolioItems)
                .Include(v => v.Works)
                .Include(v => v.Contacts)
                .Include(v => v.Company)
                .SingleAsync(x => x.Id == id);
            return VendorToDTO(vendor);
        }

        public async Task<IEnumerable<ContactDTO>> GetVendorContacts(long id)
        {
            var vendor = await _unitOfWork.VendorRepository.Query
                .Include(v => v.Contacts)
                .SingleAsync(x => x.Id == id);

            return vendor.Contacts.Select(c => new ContactDTO() {
                Id = c.Id,
                Type = c.Type,
                Value = c.Value
            });
        }

        public async Task<IEnumerable<SubcategoryShortDTO>> GetVendorCategoriesAsync(long id)
        {
            var vendor = await _unitOfWork.VendorRepository.Query
                .Include(v => v.Works)
                .SingleAsync(x => x.Id == id);

            var works = vendor.Works;
            return works.GroupBy(w => w.Subcategory)
                .Select(g => new SubcategoryShortDTO()
                    {
                        Id = g.Key.Id,
                        Name = g.Key.Name,
                        Category = g.Key.Category.Name,
                        CategoryId = g.Key.Category.Id,
                        Description = g.Key.Description
                    }).ToList();
        }

        public async Task<long> GetVendorAccountIdAsync(long id)
        {
            var vendor = await _unitOfWork.VendorRepository.Query
                .Include(v => v.Person)
                .Include(v => v.Person.Account)
                .SingleAsync(x => x.Id == id);
            return vendor.Person.Account.Id;
        }

        private VendorDTO VendorToDTO(Vendor vendor)
        {
            return new VendorDTO()
            {
                AvatarUrl = vendor.Person.Account.Avatar,
                Company = vendor.Company?.Name,
                CompanyId = vendor.Company?.Id,
                Experience = vendor.Experience,
                ExWork = vendor.ExWork,
                FIO = $"{vendor.Person.Name} {vendor.Person.Surname}",
                Id = vendor.Id,
                City = vendor.Person.Location.City,
                LocationId = vendor.Person.Location.Id,
                Position = vendor.Position,
                WorkLetter = vendor.WorkLetter
            };
        }

        public async Task Create(VendorRegisterDTO vendorDto)
        {
            //Mapper.Initialize(cfg =>
            //{
            //    cfg.CreateMap<LocationDTO, Location>();
            //    cfg.CreateMap<PermissionDTO, Permission>();
            //    cfg.CreateMap<RoleDTO, Role>();
            //    cfg.CreateMap<SocialAccountDTO, SocialAccount>();
            //    cfg.CreateMap<AccountDTO, Account>();
            //    cfg.CreateMap<PersonDTO, Person>();
            //    cfg.CreateMap<VendorDTO, Vendor>();
            //});
            var account = new Account();
            var role = new Role();
            var permissions = new List<Permission>();
            var socialAccounts = new List<SocialAccount>();
            var socialAccount = new SocialAccount();
            var vendor = new Vendor();
            var person = new Person();

            account.Role = role;
            account.Permissions = permissions;
            account.DateCreated = DateTime.Now;
            account.Email = vendorDto.Email;
            account.SocialAccounts = socialAccounts;

            role.Name = "vendor";

            socialAccount.Provider = vendorDto.Provider;
            socialAccount.Uid = vendorDto.Uid;
            socialAccount.Account = account;

            socialAccounts.Add(socialAccount);

            person.Birthday = vendorDto.Birthday;
            person.Phone = vendorDto.Phone;
            person.Name = vendorDto.FirstName;
            person.MiddleName = vendorDto.MiddleName;
            person.SurnameName = vendorDto.LastName;
            person.Account = account;
            person.Location = new Location();

            vendor.Person = person;
            vendor.Experience = vendorDto.Experience;
            vendor.Position = vendorDto.Position;
            vendor.ExWork = vendorDto.Speciality;

            _unitOfWork.VendorRepository.Create(vendor);
            await _unitOfWork.SaveAsync();
        }
    }
}

