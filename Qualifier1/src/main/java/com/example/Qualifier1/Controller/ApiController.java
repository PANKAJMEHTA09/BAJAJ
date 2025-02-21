package com.example.Qualifier1.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

    @RestController
    @RequestMapping("/bfhl")
    public class ApiController {

        @GetMapping
        public ResponseEntity<Map<String, Integer>> getOperationCode() {
            Map<String, Integer> response = new HashMap<>();
            response.put("operation_code", 1);
            return ResponseEntity.ok(response);
        }

        @PostMapping
        public ResponseEntity<Map<String, Object>> processData(@RequestBody Map<String, List<String>> request) {
            Map<String, Object> response = new HashMap<>();

            // Extract data array
            List<String> data = request.get("data");
            if (data == null || data.isEmpty()) {
                response.put("is_success", false);
                response.put("message", "Invalid input: data array is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Separate numbers and alphabets
            List<String> numbers = new ArrayList<>();
            List<String> alphabets = new ArrayList<>();
            for (String item : data) {
                if (item.matches("\\d+")) {
                    numbers.add(item);
                } else if (item.matches("[a-zA-Z]")) {
                    alphabets.add(item);
                }
            }

            // Determine the highest alphabet (case insensitive)
            List<String> highestAlphabet = new ArrayList<>();
            if (!alphabets.isEmpty()) {
                alphabets.sort(String.CASE_INSENSITIVE_ORDER);
                highestAlphabet.add(alphabets.get(alphabets.size() - 1));
            }

            // Set response values
            response.put("is_success", true);
            response.put("user_id", "john_doe_17091999");
            response.put("email", "john@xyz.com");
            response.put("roll_number", "ABCD123");
            response.put("numbers", numbers);
            response.put("alphabets", alphabets);
            response.put("highest_alphabet", highestAlphabet);

            return ResponseEntity.ok(response);
        }
    }













