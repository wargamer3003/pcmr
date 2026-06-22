package controller;

import dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private JdbcTemplate jdbc;
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
        Integer count = jdbc.queryForObject(
            """
            SELECT COUNT(*)
            FROM utilizador
            WHERE username = ?
            AND password = ?
            """,
            Integer.class,
            request.getUsername(),
            request.getPassword()
        );

        if(count != null && count > 0) {return ResponseEntity.ok(true);}

        return ResponseEntity.status(401).body(false);
    }
}