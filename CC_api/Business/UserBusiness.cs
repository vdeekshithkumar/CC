﻿using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace CC_api.Business
{
    public class UserBusiness
    {
        private readonly UserRepository userRepository;
       
        public UserBusiness()
        {
            this.userRepository = new UserRepository();
       
        }


        public async Task<List<User>> GetAllUserAsync()
        {
            return await userRepository.GetAllUserAsync();
        }
        public async Task<IActionResult> SaveUserAsync(User user)
        {
            var us = new User();
            us.FirstName = user.FirstName;
            us.LastName = user.LastName;
            us.Email = user.Email;
            us.Country = user.Country;
            us.City = user.City;    
            us.PhoneNumber= user.PhoneNumber;
            us.CompanyName = user.CompanyName;
            us.Password = user.Password;
            await userRepository.Create(us);
            return new OkResult();  

        }
        public async Task<AuthenticationModel> Login(Login loginmodel)
        {
            var login = await userRepository.Login(loginmodel.Email, loginmodel.Password);
            var authmodel = new AuthenticationModel();
            if (login != null)
            { 
                authmodel.Email = login.Email;
                authmodel.Password = login.Password;
                return authmodel;

            }

            return null;
        }
        public async Task PopulateJwtTokenAsync(AuthenticationModel authModel)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("!@#$%^&*()!@#$%^&*()");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        
                        new Claim(ClaimTypes.Email, authModel.Email.ToString()),
                         

                }),
                Expires = authModel.TokenExpiryDate = DateTime.UtcNow.AddMinutes(50),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            authModel.Token = tokenHandler.WriteToken(token);
        }
    }
}
