include $(TOPDIR)/rules.mk

PKG_NAME:=zapret-ebpf
PKG_RELEASE:=1
PKG_LICENSE:=MIT
PKG_MAINTAINER:=kozhini


include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Zapret eBPF datapath (CO-RE objects + loader)
  URL:=https://github.com/ibrahmsql/zapret
  DEPENDS:= +bpftool +libbpf +kmod-bpf +kmod-sched-core +kmod-sched-bpf +kmod-ifb +kmod-xdp
endef

define Package/$(PKG_NAME)/description
eBPF datapath для zapret: фильтры TLS/QUIC/SNI и фрагментатор на tc/XDP.
Содержит CO-RE .bpf.o и init-скрипт для загрузки/фиксации в bpffs.
endef

Build/Compile:= # ничего не собираем (кладём готовые .o)

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/lib/zapret/ebpf
	$(INSTALL_BIN) ./files/usr/lib/zapret/ebpf/*.bpf.o $(1)/usr/lib/zapret/ebpf/

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/zapret-ebpf $(1)/etc/init.d/zapret-ebpf

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/zapret-ebpf $(1)/etc/config/zapret-ebpf
endef
