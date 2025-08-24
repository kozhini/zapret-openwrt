include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-ebpf
PKG_RELEASE:=71.3-test

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/zapret-ebpf
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Zapret eBPF filters
  DEPENDS:=+libelf +libbpf +bpftool +kmod-bpf
endef

define Package/zapret-ebpf/description
  eBPF packet filtering programs for zapret (DPI bypass).
endef

define Build/Prepare
	$(call Build/Prepare/Default)
	mkdir -p $(PKG_BUILD_DIR)/src
	$(CP) ./files/src/* $(PKG_BUILD_DIR)/src/
endef

define Build/Compile
	for f in $(PKG_BUILD_DIR)/src/*.bpf.c; do \
		clang \
			-target bpf \
			-D__KERNEL__ -D__BPF_TRACING__ \
			-I$(LINUX_DIR)/usr/include \
			-I$(STAGING_DIR)/usr/include \
			-O2 -Wall -c $$f -o $${f%.c}.o; \
	done
endef

define Package/zapret-ebpf/install
	$(INSTALL_DIR) $(1)/usr/lib/zapret-ebpf
	$(CP) $(PKG_BUILD_DIR)/src/*.o $(1)/usr/lib/zapret-ebpf/
endef

$(eval $(call BuildPackage,zapret-ebpf))
