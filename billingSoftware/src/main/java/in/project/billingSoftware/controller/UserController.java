package in.project.billingSoftware.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.project.billingSoftware.io.UserRequest;
import in.project.billingSoftware.io.UserResponse;
import in.project.billingSoftware.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {
	private final UserService userService;
	
	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public UserResponse registerUser(@RequestBody UserRequest request) {
//		System.out.println("Register endpoint hit with request: " + request);
		try {
//			System.out.println("Registering user: " + request.getName());
			return userService.createUser(request);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Error occurred while registering user: " + e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create user");
		}
	}
	
	@GetMapping("/users")
	public List<UserResponse> readUsers(){
		return userService.readUsers();
	}
	
	
	@DeleteMapping("/users/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable String id) {
		try {
			userService.deleteUser(id);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
		}
	}
	
}




























