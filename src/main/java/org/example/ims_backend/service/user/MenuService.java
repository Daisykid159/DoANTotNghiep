package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.menu.response.MenuResponse;

import java.util.List;

public interface MenuService {
    List<MenuResponse> getMenu();
}
