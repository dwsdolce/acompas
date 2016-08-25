# This file is part of A Compás.
#
# A Compás is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# A Compás is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with A Compás. If not, see <http://www.gnu.org/licenses/>.

Vagrant.configure("2") do |config|
  config.vm.box_url = 'http://cloud-images.ubuntu.com/vagrant/vivid/current/vivid-server-cloudimg-amd64-vagrant-disk1.box'
  config.vm.box = "aCompas"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
  end

  config.vm.network "private_network", ip: "192.168.50.2"
  config.vm.synced_folder ".",
    "/vagrant",
    :nfs => true,
    :mount_options => ['actimeo=2', 'vers=3', 'tcp', 'fsc']

  config.vm.network "forwarded_port", guest: 8000, host: 8000

  config.vm.provision "shell", path: "provision.sh"

end
