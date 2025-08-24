include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-ebpf
PKG_RELEASE:=71.3-test

PKG_BUILD_DEPENDS:=clang/host llvm/host bpftool/host

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=zapret eBPF programs
  DEPENDS:=+libelf +libbpf +bpftool +kmod-bpf
endef

define Package/$(PKG_NAME)/description
 eBPF programs for zapret (compiled with clang/llvm).
endef

EBPF_DIR:=$(PKG_BUILD_DIR)/ebpf

define Build/Prepare
	mkdir -p $(EBPF_DIR)
	$(CP) ./files/src/* $(EBPF_DIR)/
endef

define Build/Compile
	for f in $(notdir $(wildcard $(EBPF_DIR)/*.c)); do \
		$(STAGING_DIR_HOSTPKG)/bin/clang -target bpf -O2 -g -Wall \
			-I$(LINUX_DIR)/usr/include \
			-I$(LINUX_DIR)/include/uapi \
			-I$(LINUX_DIR)/include \
			-c $(EBPF_DIR)/$$f -o $(EBPF_DIR)/$${f%.c}.o ; \
	done
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/lib/zapret/ebpf
	$(INSTALL_BIN) $(EBPF_DIR)/*.o $(1)/lib/zapret/ebpf/
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
