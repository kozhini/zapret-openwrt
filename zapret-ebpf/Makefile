include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-ebpf
PKG_VERSION:=71.3-test
PKG_RELEASE:=1
PKG_LICENSE:=MIT
PKG_MAINTAINER:=kozhini

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Zapret eBPF datapath (compile from source)
  URL:=https://github.com/ibrahmsql/zapret
  DEPENDS:= +libelf +zlib +libbpf +kmod-sched-core
endef

define Package/$(PKG_NAME)/description
eBPF datapath для zapret: фильтры TLS/QUIC/SNI и фрагментатор на tc/XDP.
Собирает объекты CO-RE из исходников прямо в OpenWrt SDK.
endef

# Определяем clang из хоста
CLANG := $(shell which clang || true)

define Build/Compile
	$(INSTALL_DIR) $(PKG_BUILD_DIR)/ebpf
	echo "=== Debug: PKG_BUILD_DIR = $(PKG_BUILD_DIR) ==="
	echo "=== Debug: Looking for .bpf.c files in $(CURDIR)/files/src/ ==="
	ls -la $(CURDIR)/files/src/ || echo "Directory not found"
	echo "=== Debug: CLANG path = $(CLANG) ==="
	which clang || echo "clang not found in PATH"
	clang --version || echo "clang version check failed"
	for f in $(CURDIR)/files/src/*.bpf.c; do \
		echo "=== Processing file: $$f ==="; \
		if [ ! -f "$$f" ]; then \
			echo "ERROR: File $$f does not exist!"; \
			continue; \
		fi; \
		out=$(PKG_BUILD_DIR)/ebpf/$$(basename $$f .bpf.c).bpf.o; \
		echo "=== Output file: $$out ==="; \
		if [ -x "$(CLANG)" ]; then \
			echo "=== Running clang command ==="; \
			$(CLANG) -O2 -g -target bpf -D__TARGET_ARCH_$(ARCH) -c "$$f" -o "$$out" || exit 1; \
			echo "=== Clang command completed successfully ==="; \
		else \
			echo "Error: clang not found on host."; \
			exit 1; \
		fi \
	done
endef

define Package/$(PKG_NAME)/install
	# Копируем скомпилированные eBPF-объекты
	$(INSTALL_DIR) $(1)/opt/zapret/ebpf
	$(CP) $(PKG_BUILD_DIR)/ebpf/*.bpf.o $(1)/opt/zapret/ebpf/

	# Копируем init-скрипт
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/zapret-ebpf $(1)/etc/init.d/zapret-ebpf

	# Копируем config
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/zapret-ebpf $(1)/etc/config/zapret-ebpf
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
