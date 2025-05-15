package in.project.billingSoftware.service;

import java.util.List;

import org.springframework.stereotype.Service;

import in.project.billingSoftware.io.UserRequest;
import in.project.billingSoftware.io.UserResponse;

@Service
public interface UserService {
	UserResponse createUser(UserRequest request);
	String getUserRole(String email);
	List<UserResponse> readUsers();
	void deleteUser(String id);
}
