package org.example.ims_backend.service.user.impl;

import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.MenuManager;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.entity.Menu;
import org.example.ims_backend.repository.MenuRepository;
import org.example.ims_backend.service.user.MenuService;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MenuServiceImpl implements MenuService {
    MenuRepository menuRepository;
    EntityManager entityManager;
    @Override
    public List<MenuResponse> getMenu(Long id) {
        List<Menu> menus = menuRepository.findAll();
        MenuManager manager = new MenuManager();
        for (Menu menu : menus){
            Long parentMenuId = null;
            String[] codeSegments = menu.getMenuCode().split("\\.");
            String query = menu.getQuery();
            Query qery = entityManager.createQuery(query);
            qery.setParameter("userId", id);
            List results = qery.getResultList();
            int totalTask =  results.size();
            if (codeSegments.length >= 2){
                try {
                    parentMenuId = Long.parseLong(codeSegments[codeSegments.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentMenuId in menu code: {}", menu.getMenuCode(), e);
                }
            }
            manager.addMenu(
                    menu.getId(),
                    menu.getMenuName(),
                    menu.getMenuCode(),
                    totalTask,
                    parentMenuId,
                    menu.getIsActive()
            );
        }
        return manager.getAllMenus();
    }
}
