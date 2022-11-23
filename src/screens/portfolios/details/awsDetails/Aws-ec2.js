export const ec2 = `
    /* 먼저 AWS 홈페이지에서 EC2서버를 생성, 
    생성된서버의 인바운드 규칙에 express에서 설정한 port 번호 추가 후
    커멘드를 이용하여 받은 키페어로 연결을해준다 */
    $ ssh -i ["키페어 이름"] ubuntu@[퍼블릭 ip주소 혹은 퍼블릭 DNS]

    $ sudo apt-get update 
    $ sudo apt-get install nodejs
    $ sudo apt-get install npm
    $ sudo apt-get install git
    /* 위의 커멘드를 이용하여 nodejs, npm, git 설치 */

    $ git clone [깃헙 주소]
    /* 깃헙에 올린 코드들을 pull 해줌 */

    $ sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port [인바운드에 추가한 port번호]
    /* 도메인주소:port 가 아닌 도메인주소 만으로도 접속가능 */

    $ npm run [서버가동코드]
    /* 서버배포시작 */
`
export const ec2Error = `
    /*배포를 시작하려하니 페이탈 에러가 났다.
    내용은 memory가 부족하다는것이었다.*/

    $ sudo dd if=/dev/zero of=/swapfile bs=128M count=32
    /* 위의 커맨드를 입력하니 할당된 메모리는 4GB정도였다.
    검색해보니 스왑파일을 생성하여 부족한 메모리를 그 스왑파일에 할당할수 있었다. */

    $ sudo chmod 600 /swapfile 
    $ sudo mkswap /swapfile
    $ sudo swapon /swapfile
    $ sudo swapon -s
    /* 위의 커맨드를 입력하여 스왑파일의 권한과 설정을 업데이트 해주었다. */

    $ sudo vi /etc/fstab
    /* 우분투 vi 편집기를 이용하여 해당 파일접근 */

    /swapfile swap swap defaults 0 0
    /* 위의 내용을 추가한후 저장 */

    /* 이후 메모리문제없이 서버가 작동되었다. */
`