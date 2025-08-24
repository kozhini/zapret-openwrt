include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-ebpf
PKG_VERSION:=71.3.0
PKG_RELEASE:=1

PKG_BUILD_DIR := $(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Zapret eBPF filters
  DEPENDS:=+libelf +libbpf
endef

define Package/$(PKG_NAME)/description
 eBPF filters for Zapret (dpi bypass). 
 Includes precompiled .o objects built from *.bpf.c sources.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)/src
	$(CP) ./files/src/* $(PKG_BUILD_DIR)/src/
endef

define Build/Compile
	$(MAKE) -C $(PKG_BUILD_DIR)/src \
		CC="clang" \
		EXTRA_CFLAGS="-O2 -target bpf -I$(STAGING_DIR)/usr/include -I$(STAGING_DIR)/usr/include/bpf" \
		EXTRA_LDFLAGS=""
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/lib/zapret-ebpf
	$(CP) $(PKG_BUILD_DIR)/src/*.o $(1)/usr/lib/zapret-ebpf/
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
