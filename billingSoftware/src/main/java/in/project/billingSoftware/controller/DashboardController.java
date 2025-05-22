package in.project.billingSoftware.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.project.billingSoftware.io.DashboardResponse;
import in.project.billingSoftware.io.OrderResponse;
import in.project.billingSoftware.service.OrderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    
    private final OrderService orderService;
    
    @GetMapping
    public DashboardResponse getDashboardData() {
        LocalDate today = LocalDate.now();
        Double todaySale = orderService.sumSalesByDate(today);
        Long todayOrderCount = orderService.countByorderdate(today);
        List<OrderResponse> recentOrders = orderService.findRecentOrders();
        return new DashboardResponse(
                todaySale != null ? todaySale : 0.0,
                todayOrderCount != null ? todayOrderCount : 0,
                recentOrders
        );
    }
}