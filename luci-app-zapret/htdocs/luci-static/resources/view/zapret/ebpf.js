'use strict';
'require view';
'require form';
'require uci';

return view.extend({
  load: function() { return uci.load('zapret-ebpf'); },
  render: function() {
    var m = new form.Map('zapret-ebpf', _('Zapret eBPF'));
    var s = m.section(form.TypedSection, 'zapret-ebpf', _('Main'));
    s.anonymous = true;

    var en = s.option(form.Flag, 'enabled', _('Enable'));
    en.default = en.enabled;

    var mode = s.option(form.ListValue, 'mode', _('Mode'));
    mode.value('tc', 'tc');
    mode.value('xdp', 'xdp');
    mode.default = 'tc';

    var ifn = s.option(form.DynamicList, 'ifname', _('Interfaces'));
    ifn.datatype = 'network';

    s.option(form.Flag, 'tls_fingerprint', _('TLS fingerprint')).default = '1';
    s.option(form.Flag, 'sni_encrypt',     _('SNI encrypt')).default = '1';
    s.option(form.Flag, 'quic_filter',     _('QUIC filter')).default = '1';
    s.option(form.Flag, 'fragment_ipv4',   _('IPv4 fragment')).default = '0';
    s.option(form.Flag, 'fragment_ipv6',   _('IPv6 fragment')).default = '0';

    return m.render();
  }
});
