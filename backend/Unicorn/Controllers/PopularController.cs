﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Unicorn.Core.Interfaces;
using Unicorn.Shared.DTOs;
using Unicorn.Shared.DTOs.Popular;

namespace Unicorn.Controllers
{
    [EnableCors("*", "*", "*")]
    public class PopularController : ApiController
    {
        private readonly IPopularService _popularService;

        public PopularController(IPopularService popularService)
        {
            _popularService = popularService;
        }

        [HttpGet]
        [Route("popular/categories")]
        public async Task<List<PopularCategoryDTO>> GetCategories()
        {
            return await _popularService.GetPopularCategories();
        }

        [HttpGet]
        [Route("popular/performers")]
        public async Task<List<PerformerDTO>> GetPerformers()
        {
            return await _popularService.GetPopularPerformers();
        }

        [HttpGet]
        [Route("popular/performers/{id}")]
        public async Task<List<PerformerDTO>> GetPerformersById(long id) // id - category id
        {
            return await _popularService.GetPopularPerformers(id);
        }

        [HttpGet]
        [Route("popular/allperformers")]
        public async Task<List<FullPerformerDTO>> GetAllPerformers()
        {
            return await _popularService.GetAllPerformersAsync();
        }

        [HttpGet]
        [Route("popular/search")]
        public async Task<PerformersPage> GetFilteredPerformers(
            DateTimeOffset? date, int timeZone, string city = null, string name = null, string role = "all", double? rating = 0, string ratingCondition = "grater", bool withReviews = false, string categoriesString = null,
            string subcategoriesString = null, double? latitude = null, double? longitude = null, double? distance = null, string sort = "rating", int page = 1, int pagesize = 20
            )
        {
            try
            {               
                var performers = await _popularService.GetPerformersByFilterAsync(city, name, role, rating, ratingCondition, withReviews, categoriesString,
                    subcategoriesString, latitude, longitude, distance, sort, date, timeZone);

                return _popularService.GetPerformersPage(page, pagesize, performers);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
