package in.project.billingSoftware.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.project.billingSoftware.entity.UserEntity;
import in.project.billingSoftware.io.UserRequest;
import in.project.billingSoftware.io.UserResponse;
import in.project.billingSoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserResponse createUser(UserRequest request) {
		System.out.println("Creating user with request: " + request);
		UserEntity newUser= convertToEntity(request);
		System.out.println("New user entity: " + newUser);
		userRepository.save(newUser);
		return convertToResponse(newUser);
	}

	private UserResponse convertToResponse(UserEntity newUser) {
		return UserResponse.builder()
		.name(newUser.getName())
			.userId(newUser.getUserId())
			.email(newUser.getEmail())
			.role(newUser.getRole())
			.createdAt(newUser.getCreatedAt())
			.updatedAt(newUser.getUpdatedAt())
			.build();
		
	}

	private UserEntity convertToEntity(UserRequest request) {
		return UserEntity.builder()
				.password(passwordEncoder.encode(request.getPassword()))
			.email(request.getEmail())
			.userId(UUID.randomUUID().toString())
			.role(request.getRole().toUpperCase())
			.name(request.getName())
			.build();
	}

	@Override
	public String getUserRole(String email) {
		UserEntity existingUser = userRepository.findByEmail(email)
		.orElseThrow(() -> new RuntimeException("User not found"));
		return existingUser.getRole();
	}

	@Override
	public List<UserResponse> readUsers() {
	return	userRepository.findAll()
			.stream()
			.map(user->convertToResponse(user))
			.collect(Collectors.toList());
	}

	@Override
	public void deleteUser(String id) {
		UserEntity existingUser=userRepository.findByUserId(id)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		userRepository.delete(existingUser);

	}

}




















