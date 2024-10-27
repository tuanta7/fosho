package com.vdt.fosho.controller.filter;


import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.RestaurantService;
import com.vdt.fosho.utils.exceptions.ForbiddenException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;


import java.io.IOException;

@RequiredArgsConstructor
public class OwnerVerifyFilter implements Filter {

    private final RestaurantService restaurantService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(
            ServletRequest req,
            ServletResponse resp,
            FilterChain filterChain
    ) throws IOException, ServletException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        HttpServletRequest httpRequest = (HttpServletRequest) req;
        String requestURI = httpRequest.getRequestURI();
        String[] pathParts = requestURI.split("/");

        // Check if the user is the owner of the restaurant
        Long restaurantId = Long.parseLong(pathParts[2]);
        if (!restaurantService.existsByIdAndOwnerId(restaurantId, user.getId())){
            throw new ForbiddenException("This user is not the owner of the restaurant");
        }
        filterChain.doFilter(req, resp);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }

    @Bean
    public FilterRegistrationBean<OwnerVerifyFilter> verifyOwner() {
        FilterRegistrationBean<OwnerVerifyFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new OwnerVerifyFilter(restaurantService));
        registrationBean.addUrlPatterns("/restaurants/{restaurant_id}/**");
        return registrationBean;
    }
}
