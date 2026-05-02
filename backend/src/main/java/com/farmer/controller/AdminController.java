package com.farmer.controller;

import com.farmer.dto.AdminStatsResponse;
import com.farmer.entity.User;
import com.farmer.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin management APIs")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    @Operation(summary = "Get admin statistics", description = "Get comprehensive statistics for admin dashboard")
    public ResponseEntity<AdminStatsResponse> getAdminStats(
            @RequestParam(defaultValue = "week") String range) {
        AdminStatsResponse stats = adminService.getAdminStats(range);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/pending-admins")
    @Operation(summary = "Get pending admin approvals")
    public ResponseEntity<List<User>> getPendingAdmins() {
        List<User> pendingAdmins = adminService.getPendingAdmins();
        return ResponseEntity.ok(pendingAdmins);
    }

    @PostMapping("/approve-admin/{userId}")
    @Operation(summary = "Approve admin registration")
    public ResponseEntity<String> approveAdmin(@PathVariable Long userId) {
        adminService.approveAdmin(userId);
        return ResponseEntity.ok("Admin approved successfully");
    }

    @PostMapping("/reject-admin/{userId}")
    @Operation(summary = "Reject admin registration")
    public ResponseEntity<String> rejectAdmin(@PathVariable Long userId) {
        adminService.rejectAdmin(userId);
        return ResponseEntity.ok("Admin registration rejected");
    }

    @GetMapping("/all-admins")
    @Operation(summary = "Get all admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }
}

// Made with Bob