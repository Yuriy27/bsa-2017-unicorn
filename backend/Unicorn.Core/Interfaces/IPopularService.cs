﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unicorn.Shared.DTOs;
using Unicorn.Shared.DTOs.Popular;

namespace Unicorn.Core.Interfaces
{
    public interface IPopularService
    {
        Task<List<PopularCategoryDTO>> GetPopularCategories();
        Task<List<PerformerDTO>> GetPopularPerformers();
        Task<List<PerformerDTO>> GetPopularPerformers(long id);
        Task<List<FullPerformerDTO>> GetAllPerformersAsync();
        Task<List<FullPerformerDTO>> GetPerformersByFilterAsync(
            string city, string name, string role, double? rating, string ratingCondition, bool withReviews, string categoriesString,
            string subcategoriesString, double? latitude, double? longitude, double? distance, string sort, DateTimeOffset? date, int timeZone
            );
        PerformersPage GetPerformersPage(int page, int size, List<FullPerformerDTO> performers);
    }
}
