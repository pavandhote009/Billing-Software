package in.project.billingSoftware.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.project.billingSoftware.entity.UserEntity;
import in.project.billingSoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailService  implements UserDetailsService {
	
	private final UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String email) {
	    UserEntity user = userRepository.findByEmail(email)
	        .orElseThrow(() -> new UsernameNotFoundException("Email not found for the user " + email));

	    System.out.println("Loading user: " + email);
	    System.out.println("Loaded user: " + user.getEmail());
	    System.out.println("Password: " + user.getPassword());
	    System.out.println("Roles: " + user.getRole());

	    return new org.springframework.security.core.userdetails.User(
	        user.getEmail(),
	        user.getPassword(),
	        Collections.singletonList(new SimpleGrantedAuthority( user.getRole().toUpperCase()))
	    );
	}

}
