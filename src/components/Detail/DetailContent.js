import React from 'react';
import latteImg from '../../images/녹차라떼.png';

function DetailContent({ contents }) {
  console.log(contents);
  const wow = contents.hashTag.split(',');
  console.log(wow);
  return (
    <section>
      {/* <img src={latteImg} alt="라떼이미지"></img>
      <p>
        아무 말이나 쓰고싶지만은 아는 단어가 극히 한정적이여서 아무 말도 못하고 그냥 끄적이기만 하는 내 심정을
        <br />
        너가 이 기분을 어찌 아리오, 지금 이렇게 쓰고 칸만 차지하지만 무엇도 의미가 없네.
        <br />
        진짜 볼빨간사춘기 그 동안 별로라고 생각하고 지냈는데, 요즘 들을수록 정말 정교한 느낌과 <br />
        동시에 귀에 젤리같은 달콤한 느낌을 주네. 정말 생각보다 노래를 많이 잘하네 진짜 묘하게 듣는 매력이 있네.
        <br /> 진짜 노리치는 왜 아스날한테 졌지? 이길만헀는데 아르테타 이러다가 경질 안당하는거아니야?
        <br /> 라고 헐레벌떡 뛰어온 '너는 아르테타'이다. 가나라마바사아자차카파하헤헤으헤으헤으헤으헤오 아주 진짜 왜케
        학원만 가면은 정신을 못차리는거지? 진짜 의아해서 미치겠네 유일하게 학원만가면은 정신을 못차리네
      </p> */}
      <div dangerouslySetInnerHTML={{ __html: contents.content }}></div>
      {wow.map((v, i) => (
        <span key={i}>#{v}</span>
      ))}
    </section>
  );
}

export default DetailContent;
