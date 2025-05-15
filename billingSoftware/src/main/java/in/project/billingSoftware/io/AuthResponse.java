package in.project.billingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	
	
	
	private String email;
	private String token;
	private String role;
}
