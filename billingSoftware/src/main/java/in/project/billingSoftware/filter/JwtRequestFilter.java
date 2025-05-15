package in.project.billingSoftware.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.project.billingSoftware.service.AppUserDetailService;
import in.project.billingSoftware.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final AppUserDetailService appUserDetailService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();
        // 👇 Skip JWT processing for these public endpoints
        if (path.equals("/login") || path.equals("/encode")) {
            filterChain.doFilter(request, response);
            return;
        }
        // Extract the JWT token from the request header
        final String authorizationHeader = request.getHeader("Authorization");
//        System.out.println("Request AuthorizationHeader: " + authorizationHeader);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authorizationHeader.substring(7);
        String email = jwtUtil.extractUsername(jwt);
                System.out.println("Extracted email from JWT: " + email);
                

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	System.out.println("SecurityContextHolder is null");
            try {
                UserDetails userDetails = appUserDetailService.loadUserByUsername(email);

                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (Exception e) {
                logger.error("JWT validation error: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }

}