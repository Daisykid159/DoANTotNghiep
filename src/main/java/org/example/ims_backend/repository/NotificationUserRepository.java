package org.example.ims_backend.repository;

import org.example.ims_backend.entity.NotificationUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationUserRepository extends JpaRepository<NotificationUser,Long>, JpaSpecificationExecutor<NotificationUser> {
    Integer countByReceiverUserAndHasRead(User toUser, int hasRead);
}
