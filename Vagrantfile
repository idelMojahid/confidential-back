APP_NAME = "corporeal"
HOSTNAME = "#{APP_NAME}.dev"
BOX = "ubuntu/xenial64"
IP = "10.0.0.11"
# Fix Error: The requested URL returned error: 404 Not Found
# https://stackoverflow.com/a/48844332
$MEMORY = ENV.has_key?('VM_MEMORY') ? ENV['VM_MEMORY'] : "2048"
$CPUS = ENV.has_key?('VM_CPUS') ? ENV['VM_CPUS'] : "1"
$EXEC_CAP = ENV.has_key?('VM_EXEC_CAP') ? ENV['VM_EXEC_CAP'] : "100"

Vagrant.configure("2") do |config|
  config.vm.hostname = HOSTNAME
  config.vm.box = BOX
  config.vm.network :private_network, ip: IP
  config.ssh.forward_agent = true
  config.vm.synced_folder ".", "/home/ubuntu/#{APP_NAME}/current", type: "nfs"
  config.vm.network "forwarded_port", guest: 80, host: 8081

  config.vm.provider "virtualbox" do |v|
    v.name = APP_NAME
    v.customize ["modifyvm", :id, "--cpuexecutioncap", $EXEC_CAP]
    v.customize ["modifyvm", :id, "--memory", $MEMORY]
    v.customize ["modifyvm", :id, "--cpus", $CPUS]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.inventory_path = "ansible/inventories/corporeal/vagrant"
    ansible.limit = 'all'
    ansible.ask_vault_pass = true
    if ENV.has_key?('ANSIBLE_TAGS')
      ansible.tags = ENV['ANSIBLE_TAGS']
    end
  end

end
