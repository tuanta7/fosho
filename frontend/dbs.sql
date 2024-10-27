INSERT INTO `users`(role, id, avatar_public_id, avatar_url, email, full_name, password) VALUES
(0,1,NULL,NULL,'bibabibo1989@gmail.com','Phùng Thanh Độ','$2a$10$Fesbavoj6lStmGCp2J936u27LRG2lGDRr2H1iJkVRX7xk8C5QRJ3S'),
(0,2,NULL,NULL,'anhtuan9702@gmail.com','Trần Anh Tuấn','$2a$10$0y2DyWwt9eUXmwkeV2WwXujdwVWGE.L6N0GG2NtC.e17HUAq75coW');

INSERT INTO `restaurants`(is_active, rating,id,owner_id, address, close_time, logo_public_id, logo_url, name, open_time, phone, coordinates) VALUES
(1,4.6,1,1,'86 Phố Nguyễn Văn Tuyết, Trung Liệt, Đống Đa, Hà Nội','22:00','nshtm12fteimdxgicson','http://res.cloudinary.com/foshovdt24/image/upload/v1717780598/nshtm12fteimdxgicson.jpg','Cơm Tấm Sà Bì Chưởng Hà Nội','08:00','0388886666',POINT(105.8206346, 21.0092876)),
(1,0,2,1,'Số 25, Ngõ 38 Yên Lãng, Đống Đa, Hà Nội','22:30','ilkk5083k4pmucxou77f','http://res.cloudinary.com/foshovdt24/image/upload/v1717780729/ilkk5083k4pmucxou77f.png','MixiFood Hà Nội','09:30','0988888992',POINT(105.8139606, 21.0138)),
(1,0,3,2,'AEON Mall, Đường Cổ Linh, Quận Long Bien, Thành phố Hà Nội','22:00','k13mfws77laxbzg60cgz','http://res.cloudinary.com/foshovdt24/image/upload/v1717780997/k13mfws77laxbzg60cgz.jpg','Starbucks Cổ Linh','09:00','0388591079',Point(105.8972768, 21.0268209));

INSERT INTO `dishes` (id, description, discount, name, price, rating, sold, stock, thumbnail_public_id, thumbnail_url, unit, restaurant_id) VALUES
(1,'Combo Bestseller của Sà Bì Chưởng đã có mặt trên Fosho!!',2000,'Cơm Sườn Cốt Lết',100000,0,0,200,'e5r4vpkoohsecvjuzobt','http://res.cloudinary.com/foshovdt24/image/upload/v1717780606/e5r4vpkoohsecvjuzobt.jpg','Suất',1),
(2,'',15000,'Khô Gà Lá Chanh',200000,0,0,200,'ucqgcdt6tqdpiq1dpxsh','http://res.cloudinary.com/foshovdt24/image/upload/v1717780760/ucqgcdt6tqdpiq1dpxsh.jpg','Hộp',2),
(3,'',6000,'Ghẹ Sữa Rim',250000,0,0,200,'ll13ugo1x9o6stvmo8sf','http://res.cloudinary.com/foshovdt24/image/upload/v1717780783/ll13ugo1x9o6stvmo8sf.jpg','Hộp',2),
(4,'',0,'Bò Cay Xé Sợi',189000,0,0,200,'lqymcdecz4en0u69dbba','http://res.cloudinary.com/foshovdt24/image/upload/v1717780808/lqymcdecz4en0u69dbba.jpg','Hộp',2),
(5,'',11000,'Bò Khô Viên',200000,0,0,200,'zeqyzmbgh1eufgvtpzwi','http://res.cloudinary.com/foshovdt24/image/upload/v1717780846/zeqyzmbgh1eufgvtpzwi.jpg','Hộp',2),
(6,'',1000,'Grande Caramel Nonfat Latte',100000,0,0,250,'onhvjwmct4c13pm24zbd','http://res.cloudinary.com/foshovdt24/image/upload/v1717781119/onhvjwmct4c13pm24zbd.jpg','Cốc (450ml)',3),
(7,'',1000,'Caramel Frappuccino® Blended Beverage',90000,0,0,100,'x9wtiuf1j8cetccywavk','http://res.cloudinary.com/foshovdt24/image/upload/v1717900322/x9wtiuf1j8cetccywavk.jpg','Cốc',3),
(8,'',3000,'Coffee Frappuccino® Blended Beverage',100000,0,0,100,'fcahsvmkjvqwuz3j23r8','http://res.cloudinary.com/foshovdt24/image/upload/v1717900426/fcahsvmkjvqwuz3j23r8.jpg','Cốc',3),
(9,'',1000,'Java Chip Frappuccino® Blended Beverage',100000,0,0,100,'yhb11f9pwvfbwrmuuae4','http://res.cloudinary.com/foshovdt24/image/upload/v1717901703/yhb11f9pwvfbwrmuuae4.jpg','Cốc',3);

INSERT INTO shipping_address (id, address, coordinates, deleted_at, is_default, name, phone, receiver_name, user_id) VALUES
(1,'Ruby CT3, Phúc Lợi, Long Biên, Hà Nội',POINT(105.9335422, 21.0379637),NULL,'\0','Nhà ','0388591079','Trần Anh Tuấn',2),
(2,'29 Đ. La Thành, Giảng Võ, Ba Đình, Hà Nội',POINT(105.8153208, 21.0240845),NULL,'\0','Nhism','0967896789','Trần Thái Linh',1);


INSERT INTO orders (id, confirmed_at, created_at, delivered_at, note, payment_method, pickup_time, shipping_fee, status, total_discount, total_price, restaurant_id, shipping_address_id, user_id) VALUES
(1,NULL,'2024-06-09 23:09:06',NULL,NULL,NULL,NULL,30000,'PREPARING',30000,400000,2,1,2),
(2,NULL,'2024-06-09 23:09:48',NULL,NULL,NULL,NULL,30000,'PENDING',0,189000,2,1,2),
(3,NULL,'2024-06-11 15:34:13',NULL,NULL,NULL,NULL,30000,'PENDING',1000,90000,3,2,1);

INSERT INTO `order_item`(id, quantity, dish_id, order_id, user_id) VALUES
(1,1,1,NULL,2),
(2,2,3,NULL,2),
(3,1,4,2,2),
(4,2,2,1,2),
(5,1,7,3,1),
(6,1,6,NULL,1),
(7,1,8,NULL,1);