package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationReqository extends JpaRepository<Notification, Long> , JpaSpecificationExecutor<Notification> {
}
