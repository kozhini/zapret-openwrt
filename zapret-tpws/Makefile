include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-tpws
PKG_VERSION:=71.3-test

PKG_MAINTAINER:=kozhini
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=docs/LICENSE.txt

PKG_SOURCE_URL:=https://github.com/ibrahmsql/zapret.git
PKG_SOURCE_PROTO:=git
PKG_SOURCE_VERSION:=c6861598fd6851882b5c74f0f32e4fd47adb792b
PKG_SOURCE_DATE:=2025-08-20

#PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
#PKG_SOURCE_URL:=https://github.com/ibrahmsql/zapret/archive/refs/tags/v$(PKG_VERSION).tar.gz?
#PKG_HASH:=skip

include $(INCLUDE_DIR)/package.mk

#TAR_OPTIONS:=--strip-components 1 $(TAR_OPTIONS)
#TAR_CMD=$(HOST_TAR) -C $(1) $(TAR_OPTIONS)

MAKE_PATH:=tpws

define Package/$(PKG_NAME)
	SECTION:=net
	CATEGORY:=Network
	TITLE:=tpws
	SUBMENU:=Zapret
	DEPENDS:=+zlib +libcap +zapret
endef

define Build/Prepare
	$(Build/Prepare/Default)
	rm -f $(PKG_BUILD_DIR)/$(MAKE_PATH)/tpws
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/opt/zapret/tpws
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/$(MAKE_PATH)/tpws $(1)/opt/zapret/tpws/
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
