package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.service.user.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/user")
@RestController
public class MenuController {
    @Autowired
    private MenuService menuService;
    @GetMapping("/menus")
    public List<MenuResponse> getMenu() {
        return menuService.getMenu();
    }

}
