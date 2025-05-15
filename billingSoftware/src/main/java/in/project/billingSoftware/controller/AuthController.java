package in.project.billingSoftware.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.project.billingSoftware.io.AuthRequest;
import in.project.billingSoftware.io.AuthResponse;
import in.project.billingSoftware.io.UserRequest;
import in.project.billingSoftware.io.UserResponse;
import in.project.billingSoftware.service.AppUserDetailService;
import in.project.billingSoftware.service.UserService;
import in.project.billingSoftware.util.JwtUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final AppUserDetailService appUserDetailService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
//        System.out.println("Login endpoint hit with email: " + request.getEmail());

        
            authenticate(request.getEmail(), request.getPassword());
//            System.out.println("Authentication successful for email: " + request.getEmail());
            final UserDetails userDetails = appUserDetailService.loadUserByUsername(request.getEmail());
           String jwtToken = jwtUtil.generateToken(userDetails);
           String role = userService.getUserRole(request.getEmail());
           return new  AuthResponse(request.getEmail(), jwtToken, role);
    }
    
    
private void authenticate(String email, String password) throws Exception {
    try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    } catch (DisabledException e) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User account is disabled", e);
    } catch (BadCredentialsException e) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password", e);
    }	
}
//    private void authenticate(String email, String password)  throws Exception {
//       try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//		} catch (DisabledException e) {
//			throw new DisabledException("User is disabled");
//		} catch (BadCredentialsException e) {
//			throw new BadCredentialsException("Email or Password is incorrect");
//		}
//
//    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request) {
        return passwordEncoder.encode(request.get("password"));
    }
}


























